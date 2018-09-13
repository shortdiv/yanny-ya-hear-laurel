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

const postSubmission = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    debugger;
    if (payload) {
      var newPostKey = db
        .ref()
        .child(`submissions`)
        .push().key;
      db.ref(`submissions/${newPostKey}`).set({
        body: {
          human_fields: {
            clip: payload.clip
          }
        }
      });
      commit("SET_SUBMISSIONS", payload);
      resolve(payload);
    }
    reject();
  });

  // return fetch("/", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   body: encode(payload)
  // });
};

export default {
  init,
  fetchSubmissions,
  postSubmission
};
