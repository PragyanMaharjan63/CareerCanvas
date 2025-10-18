export const getSkills = (req, res) => {
  try {
    const { _id } = req.user;
    console.log(_id);
    res.send({ message: "yay" });
  } catch (error) {
    res.send({ message: error });
  }
};
