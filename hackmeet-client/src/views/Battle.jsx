import React, { useEffect, useState } from "react";
import { fetchSoal } from "../store/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import BattleUI from "../../components/BattleUI";

const Battle = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => {
    return state.soal.isLoading;
  });
  const soal = useSelector((state) => {
    return state.soal.data;
  });
  useEffect(() => {
    dispatch(fetchSoal());
  }, [isLoading]);

  if (isLoading) {
    return <h1>loading....fetching data</h1>;
  }

  return (
    <>
      <BattleUI soal={soal} />
    </>
  );
};

export default Battle;
