import React, { Component } from "react";
import ErrorPage, { ERROR_PAGE_TYPES } from "./ErrorPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      // if (process.env.NODE_ENV === "development") {
      //   return (
      //     <div className=" w-max mx-auto text-center mt-4">
      //       <h1 className="text-red-500 text-lg">Error in Dev Environment</h1>
      //       <p className="mt-2">Error Message</p>
      //       <p className="border border-red-500 p-4 mt-1 max-w-[95vw]">
      //         {this.state.error.message
      //           ? this.state.error.message
      //           : "No error message found check console logs"}
      //       </p>
      //       <p className="mt-2">Error Stack</p>
      //       <p className=" text-xs">
      //         Note: Stack trace line numbers are not the same in code Editor
      //       </p>
      //       <p
      //         className="border border-red-500 p-4 mt-1 max-w-[95vw]"
      //         dangerouslySetInnerHTML={{
      //           __html: this.state.error.stack
      //             ? this.state.error.stack.replace(/\n/g, "<br/>")
      //             : "No error message found check console logs",
      //         }}
      //       ></p>
      //     </div>
      //   );
      // }

      return <ErrorPage type={ERROR_PAGE_TYPES.INTERNAL_SERVER_ERROR} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;