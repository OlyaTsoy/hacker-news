import axios from "axios";

const baseURL = "https://hacker-news.firebaseio.com/v0/";
const newStoriesURL = `${baseURL}newstories.json`;
const storyURL = `${baseURL}item/`;

export const getStories = async () => {
  try {
    const res = await axios.get(newStoriesURL);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getStory = async (storyId) => {
  try {
    const res = await axios.get(`${storyURL + storyId}.json`)
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getComment = async (kids) => {
  try {
    const res = await axios.get(`${storyURL + kids}.json`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
