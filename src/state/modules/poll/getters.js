const hasSubmissions = state => {
  return Object.keys(state.submissions).length > 0;
};

const submissionCounts = state => {
  const soundClips = { Yanny: 0, Laurel: 0, Both: 0 };
  for (const submissionId in state.submissions) {
    const soundMap = { Yanny: "Yanny", Laurel: "Laurel", Both: "Both" };
    soundClips[
      soundMap[state.submissions[submissionId].body.human_fields.Sound]
    ] += 1;
  }
  return soundClips;
};

const totalSubmissionCount = state => {
  return Object.keys(state.submissions).length;
};

export default {
  hasSubmissions,
  submissionCounts,
  totalSubmissionCount
};
