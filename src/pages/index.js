import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// import styles from '../styles/Home.module.css'
import { useUser } from "@auth0/nextjs-auth0";

function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.sub}</p>
      </div>
    )
  );
}

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        <Link href="/api/auth/login">Login</Link>
        <br />
        <Link href="/api/auth/logout">Logout</Link>
      </h1>
      <Profile />
    </>
  );
}
