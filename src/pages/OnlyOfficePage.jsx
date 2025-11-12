import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DocSpace } from "@onlyoffice/docspace-react";

const DOCSPACE_URL = import.meta.env.VITE_DOCSPACE_URL; //|| "https://docspace-s7y06t.onlyoffice.com";

const OnlyOfficePage = ({ onBack }) => {
  const [instance, setInstance] = useState(null);
  const [viewerState, setViewerState] = useState(null);

  const handleExit = () => {
    instance?.destroyFrame?.();
    setViewerState(null);
    onBack?.();
  };

  const docspaceConfig = useMemo(() => {
    const baseConfig = {
      width: "100%",
      height: "100%",
      locale: "ko-KR",
      checkCSP: false,
      withInfoPanel: true,
      infoPanelVisible: true,
      editorCustomization: {
        locale: "ko-KR",
        region: "KR",
      },
    };

    if (!viewerState) {
      return {
        ...baseConfig,
        frameId: "docspace-manager",
        mode: "manager",
        viewTableColumns: "Name,Type",
        events: {
          onSelectCallback: (item) => {
            const fileId = item?.id || item?.fileId;
            if (!fileId) {
              return false;
            }

            const token =
              item?.requestToken ||
              item?.actions?.downloadToken ||
              item?.actions?.token ||
              null;
            const rootPath = item?.rootPath || item?.folder || "/rooms/shared/";

            setViewerState({ id: fileId, token, rootPath });
            item.preventDefault = true;
            return false;
          },
        },
      };
    }

    return {
      ...baseConfig,
      frameId: "docspace-viewer",
      mode: "viewer",
      id: viewerState.id,
      requestToken: viewerState.token ?? null,
      rootPath: viewerState.rootPath ?? "/rooms/shared/",
      editorConfig: {
        coEditing: {
          mode: "strict",
          change: true,
        },
        mode: "view",
        customization: {
          goback: {
            url: window.location.href,
            text: "목록으로",
          },
        },
      },
      events: {
        onEditorCloseCallback: () => setViewerState(null),
      },
    };
  }, [viewerState]);

  return (
    <div className="page page--full">
      <header className="toolbar">
        <div className="toolbar__info">
          <h2 className="toolbar__title">OnlyOffice DocSpace</h2>
          <span className="toolbar__subtitle">{DOCSPACE_URL}</span>
        </div>
        <button type="button" className="button" onClick={handleExit}>
          닫기
        </button>
      </header>

      <div
        className="docspace-container"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <DocSpace
          url={DOCSPACE_URL}
          config={docspaceConfig}
          onSetDocspaceInstance={setInstance}
          onLoadComponentError={(code, description) => {
            console.error("DocSpace 컴포넌트 로드 실패:", code, description);
          }}
        />
      </div>
    </div>
  );
};

OnlyOfficePage.propTypes = {
  onBack: PropTypes.func,
};

OnlyOfficePage.defaultProps = {
  onBack: undefined,
};

export default OnlyOfficePage;
