import { getSession } from "@auth0/nextjs-auth0";

export const GetSession = async () => {
  const session = await getSession();
  const user = session?.user;
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <img src={user?.picture} alt="picture" height={100} width={100} />
    </div>
  );
};
