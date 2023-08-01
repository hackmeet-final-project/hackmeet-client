import React, { useRef } from "https://cdn.skypack.dev/react@17.0.1";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../store/actions/user/actionCreator";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const dispatch = useDispatch()

  const profiles = useSelector((state) => {
    return state.user.profiles
  })

  const loading = useSelector((state) => {
    return state.user.loadingAll
  })

  useEffect(() => {
    dispatch(fetchAllUser())
  }, [loading])

  // console.log(profiles)


  if (loading) {
    return (
      <div>Loading....</div>
    )
  }
  return (
    <div style={{ height: "100vh" }} >
      <Link to="/lobby" class="bi bi-caret-left-square-fill p-2 mx-2 fs-2" style={{color: "var(--third-color)"}}></Link>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h6 className="display-6 fw-bold text-muted text-center">LEADERBOARD</h6>
        <div className="container-leaderboard">
          <div className="topLeadersList">
            {profiles.slice(0, 3).map((leader, index) => (
              <div className="leader" key={leader.id}>
                {index + 1 <= 3 && (
                  <div className="">
                    <img style={{ minWidth: "128px" }}
                      src={
                        index === 0
                          ? "https://cdn-icons-png.flaticon.com/128/2502/2502694.png"
                          : index === 1
                            ? "https://cdn-icons-png.flaticon.com/128/2502/2502698.png"
                            : index === 2
                              ? "https://cdn-icons-png.flaticon.com/128/2502/2502702.png"
                              : null
                      }
                      alt={`Trophy-${index + 1}`}
                    />
                    <div className="leaderName">{leader.firstName}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="playerslist">
            <div className="table">
              <div>#</div>

              <div>Name</div>

              <div>MMR</div>


            </div>
            <div className="list">
              {profiles.map((leader, index) => (
                <div className="player" key={leader.id}>
                  <div className="nomor"> {index + 1}</div>
                  <div className="user">
                    <span> {leader.firstName} </span>
                  </div>
                  <span> {leader.mmr} </span>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard