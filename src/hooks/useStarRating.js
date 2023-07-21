import { useState } from 'react';

const useStarRating = () => {
  const [rate, setRate] = useState(0);
  const starArr = [1, 2, 3, 4, 5];

  const reactionStar = id => {
    setRate(id);
  };

  const totalRating = score => {
    let allStarRating = 0;
    let plusRating = 0;
    for (let i = 0; i < score.length; i++) {
      allStarRating += Number(score[i].rating);
      plusRating = allStarRating / score.length;
    }
    return plusRating;
  };

  return { rate, starArr, reactionStar, totalRating };
};

export default useStarRating;
