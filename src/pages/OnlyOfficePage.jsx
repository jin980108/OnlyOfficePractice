import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DocSpace } from "@onlyoffice/docspace-react";

const DOCSPACE_URL =
  import.meta.env.VITE_DOCSPACE_URL || "https://docspace-s7y06t.onlyoffice.com"; //자신의 DocSpace URL 주소 (WORKSPACE_URL)

const OnlyOfficePage = ({ onBack }) => {
  const [instance, setInstance] = useState(null);

  const docspaceConfig = useMemo(
    () => ({
      frameId: "onlyoffice-docspace",
      mode: "manager",
      width: "100%",
      height: "100%",
      checkCSP: false,
      events: {
        onAppReady: () => {
          console.log("DocSpace가 준비되었습니다.");
        },
        onAppError: (error) => {
          console.error("DocSpace 오류:", error);
        },
      },
    }),
    []
  );

  // const docSpace = DocSpace.SDK.initViewer({ config });

  const handleExit = () => {
    if (instance) {
      instance.logout?.();
      instance.destroyFrame?.();
    }

    onBack?.();
  };

  return (
    <div className="page page--full">
      <header className="toolbar">
        <div className="toolbar__info">
          <h2 className="toolbar__title">DocSpace</h2>
          <span className="toolbar__subtitle"> {DOCSPACE_URL}</span>
        </div>
        <button type="button" className="button" onClick={handleExit}>
          닫기
        </button>
      </header>

      <div className="docspace-container">
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
