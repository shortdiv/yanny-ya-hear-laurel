import { db } from "./state";

const init = ({ commit }) => {
  db.ref("submissions").on(
    "value",
    snapshot => {
      commit("SET_SUBMISSIONS", snapshot.val());
    },
    err => {
      console.log(err);
    }
  );
};

const fetchSubmissions = ({ commit }) => {
  return db
    .ref("/submissions/")
    .once("value")
    .then(snapshot => {
      commit("SET_SUBMISSIONS", snapshot.val());
    });
};

const postSubmission = payload => {
  const encode = function(data) {
    return Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join("&");
  };
  return new Promise((reject, resolve) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(payload)
    })
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
};

export default {
  init,
  fetchSubmissions,
  postSubmission
};
