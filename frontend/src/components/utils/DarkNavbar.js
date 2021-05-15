import { Navbar, Button } from "react-bootstrap";
import { FaArchive, FaHandPointLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Toast } from "../utils/notifications";
export default function DarkNavbar() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      Toast("Success!!", "Logged out successfully!", "success");
      history.push("/login");
    } catch (error) {
      Toast("Error!!", error.message, "danger");
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark justify-content-between">
        <Navbar.Brand className="d-flex text-center" href="#home">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h1 className="px-4">
              <FaArchive className="mb-2" /> ExamVault
            </h1>
          </Link>
        </Navbar.Brand>
        <Button
          size="lg"
          onClick={handleLogout}
          variant="outline-light"
          className="mx-4"
        >
          <FaHandPointLeft className="mb-1" /> Logout
        </Button>
      </Navbar>
    </>
  );
}
