import React, { useEffect } from "react";
import { fetchSoal } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import BattleUI from "../../components/BattleUI";

const Battle = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    return state.soal.isLoading;
  });
  useEffect(() => {
    dispatch(fetchSoal());
  }, [isLoading]);

  if (isLoading) {
    return <h1>loading....fetching data</h1>;
  }

  return (
    <>
      <BattleUI />
    </>
  );
};

export default Battle;
