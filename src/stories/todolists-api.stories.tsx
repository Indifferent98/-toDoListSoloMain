import React, { useEffect, useState } from "react";

export default {
  title: "API",
};

export const GetToDoLists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {}, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateToDoList = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {}, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateToDoListTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {}, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteToDoList = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {}, []);

  return <div>{JSON.stringify(state)}</div>;
};
