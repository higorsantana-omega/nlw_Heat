import { useEffect } from "react";
import { VscGithubInverted } from "react-icons/vsc";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=bc7dedc49307210ea2b8`;

  async function signIn(gitHubCode: string) {
    const response = await api.post<AuthResponse>("authenticate", {
      code: gitHubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem("@dowhile:token", token);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [urlWithoutCode, gitHubCode] = url.split("?code=");
      window.history.pushState({}, "", urlWithoutCode);
      signIn(gitHubCode);
    }
  }, []);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size="24" />
        Entrar com o github
      </a>
    </div>
  );
}
