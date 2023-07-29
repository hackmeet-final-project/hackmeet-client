import Media from "../components/Media";
import { useEffect } from "react";
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
    <div className="container-fluid w-100" style={{ height: "100vh" }}>
      <Media />
      <BattleUI />
    </div>
  );
};

export default Battle;
