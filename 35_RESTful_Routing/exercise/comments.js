const { v4: generateID } = require("uuid");

let comments = [
  {
    username: "Arthur",
    comment:
      "**This place seems quiet...** Perhaps the knights are on a quest?",
    id: generateID(),
  },
  {
    username: "Percival",
    comment:
      "Just finished polishing my armor. Ready for whatever adventure awaits!",
    id: generateID(),
  },
  {
    username: "Gareth",
    comment: "*Yawns* Still waiting for our orders. Anyone seen Merlin?",
    id: generateID(),
  },
  {
    username: "Ector",
    comment:
      "The Round Table awaits its champions. Honor, courage, and loyalty!",
    id: generateID(),
  },
  {
    username: "Wiglaf",
    comment: "Training hard!  Gotta be prepared for anything.",
    id: generateID(),
  },
  {
    username: "Lancelot",
    comment: "...contemplating...",
    id: generateID(),
  },
  {
    username: "Viviane",
    comment: " Secrets whisper on the wind...",
    id: generateID(),
  },
];

module.exports = comments;
