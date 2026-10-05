import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Auth/AuthContext";

const GRID =
  "bg-[#6D28D9] bg-[linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] bg-[length:108px_108px]";
const SHAPE = "absolute z-[1]";
const TRIANGLE = "[clip-path:polygon(45%_0,100%_88%,0_100%)]";
const BLOB = "rounded-[50px_50px_100px_100px]";

function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative ${GRID} min-h-screen overflow-hidden grid place-items-center text-white font-[family-name:Poppins,system-ui,-apple-system,'Segoe_UI',sans-serif]`}
    >
      <span className={`${SHAPE} left-[-70px] top-[18%] w-[230px] h-[210px] rounded-[70px] bg-[#c8ff00] -rotate-[22deg] max-[860px]:scale-[.6]`} />
      <span className={`${SHAPE} right-[-80px] bottom-[14%] w-[210px] h-[280px] ${BLOB} bg-[#c8ff00] -rotate-[14deg] max-[860px]:scale-[.6]`} />
      <span className={`${SHAPE} right-[22%] top-[12%] w-[110px] h-[120px] bg-white ${TRIANGLE} max-[860px]:hidden`} />

      <div className="relative z-[2] flex flex-col items-center gap-5 px-5 text-center">
        <span
          aria-hidden="true"
          className="block w-16 h-16 rounded-full border-[5px] border-white/30 border-t-[#c8ff00] animate-spin motion-reduce:animate-pulse"
        />
        <p className="m-0 text-[17px] font-medium text-white/[.92]">Loading...</p>
      </div>
    </div>
  );
}

const PrivateRouter = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) return <PageLoader />;
  if (user) return children;

  return <Navigate to="/login" state={location.pathname} replace />;
};

export default PrivateRouter;