import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom";

export const Home =() => {
    const navigate=useNavigate();
    return (
        <div>
            <Button label={"Go to signup"} onPress={async () => {navigate("/signup")}}/>
        </div>
    )
}