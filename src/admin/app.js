import { TeamMemberPhotoPreviewPanel } from './components/TeamMemberPhotoPreview';

const config = {
  locales: [],
};

const bootstrap = (app) => {
  const contentManagerPluginApis = app.getPlugin('content-manager')?.apis;

  if (
    contentManagerPluginApis &&
    typeof contentManagerPluginApis.addEditViewSidePanel === 'function'
  ) {
    contentManagerPluginApis.addEditViewSidePanel((panels) => {
      const actionsPanelIndex = panels.findIndex((panel) => panel.type === 'actions');
      const insertIndex = actionsPanelIndex >= 0 ? actionsPanelIndex + 1 : panels.length;

      return [
        ...panels.slice(0, insertIndex),
        TeamMemberPhotoPreviewPanel,
        ...panels.slice(insertIndex),
      ];
    });
  }
};

export default {
  config,
  bootstrap,
};
