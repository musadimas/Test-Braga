import clsx from "clsx";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

interface INav {
  auth: { type: string | null; status: boolean };
  setAuth: Dispatch<SetStateAction<{ type: string | null; status: boolean }>>;
}

export const Nav: FC<INav> = ({ auth, setAuth }) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <nav className='h-20 flex justify-between items-center shadow-md px-20 z-50'>
      <img src='/icons/logo.svg' alt='Logo Petmil' className='h-[52px]' />
      <div className='flex items-center gap-5'>
        {auth.status && auth.type === "petmil" && (
          <>
            <img src='/img/profile.png' alt='Profile Picture' className='w-8 rounded-full' />
            <div
              className='relative cursor-pointer flex items-center gap-5'
              onClick={() => {
                toggle ? setToggle(false) : setToggle(true);
              }}
            >
              <h1 className='text-sm font-semibold select-none'>Petmil</h1>
              <img src='/icons/arrow-down.svg' alt='Dropdown Icon' className={clsx(["transition-all", { "rotate-180": toggle }])} />
              <button
                className={clsx(["border font-semibold text-sm bg-white p-2 w-40 rounded-md drop-shadow-md hover:bg-[#56b46f] hover:text-white", { "absolute -left-[70px] top-8": toggle, hidden: !toggle }])}
                onClick={() => {
                  setAuth({ type: null, status: false });
                  sessionStorage.setItem("auth", JSON.stringify({ type: null, status: false }));
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
        {auth.status && auth.type === "admin" && (
          <>
            <img src='/img/profile.png' alt='Profile Picture' className='w-8 rounded-full' />
            <div
              className='relative cursor-pointer flex items-center gap-5'
              onClick={() => {
                toggle ? setToggle(false) : setToggle(true);
              }}
            >
              <h1 className='text-sm font-semibold select-none'>Admin</h1>
              <img src='/icons/arrow-down.svg' alt='Dropdown Icon' className={clsx(["transition-all", { "rotate-180": toggle }])} />
              <button
                className={clsx(["border font-semibold text-sm bg-white p-2 w-40 rounded-md drop-shadow-md hover:bg-[#56b46f] hover:text-white", { "absolute -left-[70px] top-8": toggle, hidden: !toggle }])}
                onClick={() => {
                  setAuth({ type: null, status: false });
                  sessionStorage.removeItem("auth");
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </>
        )}
        <div className='flex gap-[30px]'>
          <Button
            className={clsx([{ block: !auth.status, hidden: auth.status }])}
            type='button'
            color='primary'
            label='Log in as Admin'
            onClick={() => {
              setAuth({ type: "admin", status: true });
              sessionStorage.setItem("auth", JSON.stringify({ type: "admin", status: true }));
              navigate("/dashboard/admin");
            }}
          />
          <Button
            className={clsx([{ block: !auth.status, hidden: auth.status }])}
            type='button'
            color='primary'
            label='Log in as Petmil'
            onClick={() => {
              setAuth({ type: "petmil", status: true });
              sessionStorage.setItem("auth", JSON.stringify({ type: "petmil", status: true }));
              navigate("/dashboard/petmil");
            }}
          />
        </div>
      </div>
    </nav>
  );
};
