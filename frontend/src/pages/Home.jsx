import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <br>
        <br></br>
      </br>
      <Button
        label={"Go to signup"}
        onPress={async () => {
          navigate("/signup");
        }}
      />
      <div>
        <br>
          <br></br>
        </br>
      </div>
      <Button
        label={"Go to signin"}
        onPress={async () => {
          navigate("/signin");
        }}
      />
    </div>
  );
};
