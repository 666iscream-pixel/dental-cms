import * as React from 'react';
import { useForm } from '@strapi/strapi/admin';

const TEAM_MEMBER_UID = 'api::team-member.team-member';

const styles = {
  panel: {
    width: '100%',
  },
  helper: {
    margin: '0 0 12px',
    color: '#6D7782',
    fontSize: 12,
    lineHeight: 1.55,
  },
  card: {
    overflow: 'hidden',
    width: '100%',
    maxWidth: 360,
    background: 'linear-gradient(180deg, #ffffff 0%, #f7fafc 100%)',
    border: '1px solid #dbe3ea',
    borderRadius: 20,
    color: '#1d1d1f',
    boxShadow: '0 24px 70px rgba(44, 58, 72, 0.05)',
    transform: 'translateZ(0)',
  },
  photoFrame: {
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    background: '#E8ECF1',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    display: 'block',
  },
  emptyState: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #EEF2F6 0%, #DDE6EE 52%, #F7FAFC 100%)',
  },
  initials: {
    display: 'flex',
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.7)',
    background: 'rgba(255,255,255,0.5)',
    color: '#1D1D1F',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 32,
    letterSpacing: '-0.04em',
    boxShadow: '0 24px 70px rgba(44,58,72,0.10)',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 96,
    background: 'linear-gradient(to top, rgba(29,29,31,0.18), transparent)',
    pointerEvents: 'none',
  },
  body: {
    padding: '28px 28px 30px',
  },
  position: {
    margin: '0 0 12px',
    color: '#8A8F98',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.16em',
    lineHeight: 1.35,
    textTransform: 'uppercase',
  },
  name: {
    margin: '0 0 16px',
    color: '#1D1D1F',
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontSize: 32,
    lineHeight: 1.02,
    letterSpacing: '-0.03em',
    fontWeight: 400,
  },
  description: {
    margin: 0,
    color: '#5B6570',
    fontSize: 15,
    lineHeight: 1.85,
  },
  note: {
    margin: '12px 0 0',
    color: '#8A8F98',
    fontSize: 11,
    lineHeight: 1.5,
  },
};

const getFirstValue = (...values) => values.find((value) => value !== undefined && value !== null && value !== '');

const normalizeMedia = (media) => {
  if (!media) return null;

  if (Array.isArray(media)) {
    return normalizeMedia(media[0]);
  }

  if (media.data) {
    return normalizeMedia(Array.isArray(media.data) ? media.data[0] : media.data);
  }

  if (media.attributes) {
    return {
      ...media.attributes,
      id: media.id ?? media.attributes.id,
    };
  }

  return media;
};

const getImageUrl = (media) => {
  const normalized = normalizeMedia(media);
  const rawUrl = normalized?.url || normalized?.previewUrl || normalized?.formats?.large?.url || normalized?.formats?.medium?.url || normalized?.formats?.small?.url || normalized?.formats?.thumbnail?.url;

  if (!rawUrl) return '';
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;

  return `${window.location.origin}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;
};

const getInitials = (firstName, lastName) => {
  const first = String(firstName || '').trim().charAt(0);
  const last = String(lastName || '').trim().charAt(0);
  const initials = `${first}${last}`.toUpperCase();

  return initials || '—';
};

export const TeamMemberPhotoPreviewContent = ({ document }) => {
  const values = useForm('TeamMemberPhotoPreview', (state) => state.values);

  const firstName = getFirstValue(values?.first_name, document?.first_name, 'Imię');
  const lastName = getFirstValue(values?.last_name, document?.last_name, 'Nazwisko');
  const position = getFirstValue(values?.position, document?.position, 'Stanowisko');
  const description = getFirstValue(values?.description, document?.description, 'Krótki opis specjalisty będzie widoczny w tym miejscu.');
  const photo = getFirstValue(values?.photo, document?.photo);
  const photoAlt = getFirstValue(values?.photo_alt, document?.photo_alt, `${firstName} ${lastName}`);
  const imageUrl = getImageUrl(photo);

  return (
    <div style={styles.panel}>
      <p style={styles.helper}>
        Podgląd pokazuje proporcję zdjęcia i ramkę karty tak, jak na stronie zespołu. Zdjęcie jest kadrowane od góry w proporcji 3:4.
      </p>

      <article style={styles.card}>
        <div style={styles.photoFrame}>
          {imageUrl ? (
            <img src={imageUrl} alt={photoAlt} style={styles.image} />
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.initials}>{getInitials(firstName, lastName)}</div>
            </div>
          )}
          <div style={styles.gradient} />
        </div>

        <div style={styles.body}>
          <p style={styles.position}>{position}</p>
          <h3 style={styles.name}>{firstName} {lastName}</h3>
          <p style={styles.description}>{description}</p>
        </div>
      </article>

      <p style={styles.note}>
        Jeżeli twarz jest ucięta, popraw kadrowanie oryginalnego zdjęcia przed publikacją.
      </p>
    </div>
  );
};

export const TeamMemberPhotoPreviewPanel = ({ model, document }) => {
  if (model !== TEAM_MEMBER_UID) {
    return null;
  }

  return {
    title: 'Podgląd zdjęcia',
    content: <TeamMemberPhotoPreviewContent document={document} />,
  };
};

TeamMemberPhotoPreviewPanel.type = 'team-member-photo-preview';
