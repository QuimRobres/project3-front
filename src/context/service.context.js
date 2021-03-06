import React from "react";
import serviceService from "../services/service.service";

const { Consumer, Provider } = React.createContext();

class ServiceProvider extends React.Component {
  state = {
    serviceDetail: {},
    serviceList: [],
  };

  serviceService = new serviceService();

  async componentDidMount() {
    try {
      const result = await this.serviceService.showServices();
      if (result) {
        this.setState({ serviceList: result.data });
      }
    } catch (err) {
      this.setState({ isLoggedIn: false, isLoading: false, service: null });
    }
  }

  createService = async (data) => {
    try {
      const response = await this.serviceService.createService(data);
      if (response) {
        this.setState({ ...this.state, service: response.data });
      }
    } catch (error) {
      this.setState({ ...this.state });
    }
  };

  showServices = async () => {
    try {
      const response = await this.serviceService.showServices();
      if (response) {
        this.setState({ ...this.state, serviceList: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  showServiceDetail = async (id) => {
    try {
      const response = await this.serviceService.showServiceDetail(id);
      if (response) {
        this.setState({ ...this.state, serviceDetail: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  editService = async (id, data) => {
    try {
      console.log("ID", id);
      console.log("Data service", data);
      const response = await this.serviceService.editOneService(id, data);
      console.log("response", response);
      if (response) {
        this.setState({ ...this.state, serviceDetail: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteService = async (id) => {
    try {
      const deletedService = await this.serviceService.deleteService(id);
      const response = await this.serviceService.showServices();
      if (response) {
        this.setState({ ...this.state, user: response.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { serviceDetail, serviceList } = this.state;

    return (
      <Provider
        value={{
          serviceDetail,
          serviceList,
          createService: this.createService,
          showService: this.showServices,
          showServiceDetail: this.showServiceDetail,
          editService: this.editService,
          deleteService: this.deleteService,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const withService = (WrappedComponent) => {
  return function (props) {
    return (
      <Consumer>
        {(value) => {
          const {
            serviceDetail,
            serviceList,
            createService,
            showService,
            showServiceDetail,
            editService,
            deleteService,
          } = value;

          return (
            <WrappedComponent
              serviceDetail={serviceDetail}
              serviceList={serviceList}
              createService={createService}
              showServices={showService}
              showServiceDetail={showServiceDetail}
              editService={editService}
              deleteService={deleteService}
              {...props}
            />
          );
        }}
      </Consumer>
    );
  };
};

export { ServiceProvider, withService };
