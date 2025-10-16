import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Error Boundary component to catch and handle React errors gracefully
 * Prevents the entire app from crashing when a component throws an error
 * @class ErrorBoundary
 * @extends {Component}
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when an error is caught
   * @param {Error} error - The error that was thrown
   * @returns {Object} New state object
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error details for debugging
   * @param {Error} error - The error that was thrown
   * @param {Object} errorInfo - Component stack trace
   */
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  /**
   * Reset error boundary state
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-primary-700 mb-4">Hoppá!</h1>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Valami hiba történt
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Elnézést kérünk a kellemetlenségért. Egy váratlan hiba történt az oldal betöltése során.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-8 py-3 rounded-lg text-white font-semibold hover:bg-primary-800 transition-colors"
              >
                Oldal újratöltése
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 rounded-lg border-2 border-primary-700 text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
              >
                Vissza a kezdőlapra
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mt-8 text-left bg-red-50 border border-red-200 rounded-lg p-4">
                <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                  Fejlesztői információk
                </summary>
                <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap">
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
