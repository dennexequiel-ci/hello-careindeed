import { branches } from '../data/branches';

function findNearestBranch(zipCode: string) {
  let nearestBranch = null;
  let smallestDifference = Infinity;

  for (const branch of branches) {
    const difference = Math.abs(parseInt(branch.zipCode) - parseInt(zipCode));

    if (difference < smallestDifference) {
      smallestDifference = difference;
      nearestBranch = branch;
    }
  }

  return nearestBranch;
}

export default findNearestBranch;
