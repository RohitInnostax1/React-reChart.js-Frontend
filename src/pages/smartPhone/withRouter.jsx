import { useNavigate, useParams } from "react-router-dom";

export function withRouter(Component) {
  return function (props) {
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}
