import "../styles/globals.css";
import Header from "../components/Header";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  )
}