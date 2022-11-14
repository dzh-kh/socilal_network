import React, { Component } from "react";

interface MyProps {
  children: any;
}

interface MyState {
  hasError: boolean;
}

class ErrorBoundary extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
