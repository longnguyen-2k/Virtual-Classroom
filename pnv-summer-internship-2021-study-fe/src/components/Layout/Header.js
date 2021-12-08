import ModalCreate from "../Classroom/ModalClass";
import Avatar from "components/Avatar";
import { UserCard } from "components/Card";
import Notifications from "components/Notifications";
import SearchInput from "components/SearchInput";
import withBadge from "hocs/withBadge";
import { getNotificationData } from "../../APIService/NotificationService";
import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import {
  MdClearAll,
  MdExitToApp,
  MdNotificationsActive,
  MdNotificationsNone,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from "reactstrap";
import bn from "utils/bemnames";
const bem = bn.create("header");

const MdNotificationsActiveWithBadge = withBadge({
  size: "md",
  color: "primary",
  style: {
    top: -10,
    right: -10,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  children: <small>5</small>,
})(MdNotificationsActive);

function Header(props) {
  const { setCallSearch, setSearchClass } = props;
  const history = useHistory();
  const [notificationsData, setNotificationData] = useState([]);
  const [isOpenNotificationPopover, setOpenNotificationPopover] =
    useState(false);
  const [isOpenUserCardPopover, setOpenUserCardPopover] = useState(false);
  const [isNotificationConfirmed, setNotificationConfirmed] = useState(false);
  const [user, setUser] = useState({});
  const toggleNotificationPopover = () => {
    setOpenNotificationPopover(!isOpenNotificationPopover);
    if (!isNotificationConfirmed) {
      setNotificationConfirmed(true);
    }
  };

  useEffect(() => {
    const call = async () => {
      const { data } = await getNotificationData();
      if (data) {
        const { newMessage, oldMessage } = data;
        setNotificationData([...newMessage, ...oldMessage]);
      }
    };
    call();
  }, []);
  const toggleUserCardPopover = () => {
    setOpenUserCardPopover(!isOpenUserCardPopover);
  };

  const handleSidebarControlButton = (event) => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector(".cr-sidebar").classList.toggle("cr-sidebar--open");
  };

  const load = () => {
    const userLoad = cookie.load("user");
    if (userLoad) {
      setUser(userLoad.data);
    } else {
      logout();
    }
  };
  useEffect(() => {
    load();
    setInterval(logout, 7000000);
  }, []);
  const logout = async () => {
    await cookie.remove("user", { path: "/" });
    history.push("/login");
  };
  const { email, avatar, name: userName } = user;
  return (
    <Navbar light expand className={bem.b("bg-white")}>
      <Nav navbar className="mr-2">
        <Button outline onClick={handleSidebarControlButton}>
          <MdClearAll size={25} />
        </Button>
      </Nav>
      <Nav navbar>
        <SearchInput
          setCallSearch={setCallSearch}
          setSearchClass={setSearchClass}
        />
      </Nav>
      <Nav navbar className={bem.e("nav-right")}>
        <NavItem id="class-button" className="d-inline-flex">
          <NavLink className="position-relative">
            <ModalCreate />
          </NavLink>
        </NavItem>
        <NavItem className="d-inline-flex">
          <NavLink id="Popover1" className="position-relative">
            {isNotificationConfirmed ? (
              <MdNotificationsNone
                size={25}
                className="text-secondary can-click"
                onClick={toggleNotificationPopover}
              />
            ) : (
              <MdNotificationsActiveWithBadge
                size={25}
                className="text-secondary can-click animated swing infinite"
                onClick={toggleNotificationPopover}
              />
            )}
          </NavLink>
          <Popover
            placement="bottom"
            isOpen={isOpenNotificationPopover}
            toggle={toggleNotificationPopover}
            target="Popover1"
          >
            <PopoverBody>
              <Notifications notificationsData={notificationsData} />
            </PopoverBody>
          </Popover>
        </NavItem>

        <NavItem>
          <NavLink id="Popover2">
            {user && (
              <Avatar
                onClick={toggleUserCardPopover}
                className="can-click"
                avatar={avatar}
              />
            )}
          </NavLink>
          <Popover
            placement="bottom-end"
            isOpen={isOpenUserCardPopover}
            toggle={toggleUserCardPopover}
            target="Popover2"
            className="p-0 border-0"
            style={{ minWidth: 250 }}
          >
            {user && (
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={userName}
                  subtitle={email}
                  avatar={avatar}
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem
                      tag="button"
                      onClick={logout}
                      action
                      className="border-light"
                    >
                      <MdExitToApp /> Signout
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            )}
          </Popover>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default Header;
