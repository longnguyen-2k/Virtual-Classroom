import { Content, Header, Sidebar } from "components/Layout";
import React from "react";
import { MdImportantDevices } from "react-icons/md";
import { BREAKPOINTS, BREAKPOINTS_ARR } from "../constants.js";
class MainLayout extends React.Component {
  static isSidebarOpen() {
    return document
      .querySelector(".cr-sidebar")
      .classList.contains("cr-sidebar--open");
  }

  componentWillReceiveProps({ breakpoint }) {
    if (breakpoint !== this.props.breakpoint) {
      this.checkBreakpoint(breakpoint);
    }
  }

  componentDidMount() {
    this.checkBreakpoint(this.props.breakpoint);

    setTimeout(() => {
      if (!this.notificationSystem) {
        return;
      }

      this.notificationSystem.addNotification({
        title: <MdImportantDevices />,
        message: "Welome to classroom!",
        level: "info",
      });
    }, 1500);
  }
  handleContentClick = (event) => {
    if (
      MainLayout.isSidebarOpen() &&
      BREAKPOINTS_ARR.includes(this.props.breakpoint)
    )
      this.openSidebar("close");
  };

  checkBreakpoint(breakpoint) {
    switch (breakpoint) {
      case BREAKPOINTS.XS:
      case BREAKPOINTS.SM:
      case BREAKPOINTS.MD:
        return this.openSidebar("close");

      case BREAKPOINTS.LG:
      case BREAKPOINTS.XL:
      default:
        return this.openSidebar("open");
    }
  }

  openSidebar(openOrClose) {
    if (openOrClose === "open") {
      return document
        .querySelector(".cr-sidebar")
        .classList.add("cr-sidebar--open");
    }
    document.querySelector(".cr-sidebar").classList.remove("cr-sidebar--open");
  }

  render() {
    const { children, setSearchClass } = this.props;

    return (
      <main className="cr-app bg-light">
        <Sidebar setSearchClass={setSearchClass} />
        <Content fluid onClick={this.handleContentClick}>
          <Header setSearchClass={setSearchClass} />
          {children}
        </Content>
      </main>
    );
  }
}

export default MainLayout;
