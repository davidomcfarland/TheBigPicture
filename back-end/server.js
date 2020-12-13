let express    = require("express");
let bodyParser = require("body-parser");
let mongoose   = require("mongoose")

let app = express();

app.use(
  bodyParser.json()
);

app.use(
  bodyParser.urlencoded({extended: false})
)

mongoose.connect(
  "mongodb://localhost:27017/TheBigPicture",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

let TopicSchema = new mongoose.Schema({
  name: String,
  description: String,
  parents: Array,
  children: Array,
  equations: Array,
  sources: Array,
});

TopicSchema.set("toJSON", {virtuals: true});

let Topic = mongoose.model("Topic", TopicSchema);

let ListNodeSchema = mongoose.Schema({
  topic: String,
  prev: Array,
  next: Array,
});

let ListNode = mongoose.model("ListNode", ListNodeSchema);

let ListSchema = mongoose.Schema({
  name: String,
  description: String,
  root: ListNodeSchema,
});

let List = mongoose.model("List", ListSchema);

/*
------- Topic Global methods -----------
get  -- get all topics
post -- add new topic
*/
app.get(
  "/api/topics",
  async (req, res) => {
    try {
      let response = await Topic.find();
      res.send(response);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
app.post(
  "/api/topics",
  async (req, res) => {
    try {
      let newTopic = new Topic({
        name: req.body.name,
        description: req.body.description,
        parents: req.body.parents,
        children: req.body.children,
        equations: req.body.equations,
        sources: req.body.sources,
      });

      newTopic.save();

      res.send(newTopic);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

/*
--------- hints --------
*/

app.get(
  "/api/topics/hint/:input",
  async (req, res) => {
    let input = req.params.input;
    let reg = "/^" + input +"/g"
    try {
      let hints = await Topic.find({
        name: {$regex: input}
      })

      hints = hints.map(
        a => {return {name: a.name, id: a._id}}
      );

      res.send(hints);
    }
    catch (error) {
      console.log(error);
    }
  }
)

/*
------- Topic Methods By Id -----------
*/

app.get(
  "/api/topics/ById",
  async (req, res) => {
    let _id = req.body._id;

    try {
      let target = await Topic.find({_id: _id});
      res.send(target);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
app.put(
  "/api/topics/ById",
  async (req, res) => {
    try {
      let response = await Topic.updateOne(
        {_id: req.body._id},
        req.body
      );

      response = await ListNode.updateOne(
      )

      console.log(response);

      res.send(response);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
app.delete(
  "/api/topics/ById/:id",
  async (req, res) => {
    try {
      let id = req.params.id;
      console.log(id);
      let response;
      response = await Topic.deleteOne({_id: id});
      console.log(response);
      response = await ListNode.deleteMany({topic: id});
      console.log(response);

      res.sendStatus(200);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

/*
-------- Topic Methods by name -------
*/

app.get(
  "/api/Topics/ByName/:name",
  async (req, res) => {
    try {
      let topic = await Topic.find({name: req.params.name});

      res.send(topic);
    }
    catch (error) {
      res.send(error);
    }
  }
);

/*
---------- Lists
*/


/*
------- List global methods ------
*/

app.get(
  "/api/lists",
  async (req, res) => {
    try {
      let lists = await List.find();

      res.send(lists)
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
app.post(
  "/api/lists",
  async (req, res) => {
    try {

      let newRoot = req.body.rootid;

      let newRootNode = new ListNode({
        topic: newRoot,
        prev: Array(),
        next: Array(),
      });


      let newList = new List({
        name: req.body.name,
        description: req.body.description,
        root: newRootNode,
      })

      newList.save();
      newRootNode.save();

      res.sendStatus(200);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

app.delete(
  "/api/lists/:id",
  async (req, res) => {
    try {
      let id = req.params.id;

      let response = await List.deleteOne({_id: id});

      console.log(response);

      res.sendStatus(200);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

/*
-------- List root Methods ------
*/

app.get(
  "/api/lists/:name/root",
  async (req, res) => {
    let name = req.params.name;

    try {
      let list = await List.find({name: name});

      if (list.length == 0) {
        res.sendStatus(404);
        return;
      }

      let rootid = list[0].root._id;

      let root = await ListNode.find({_id: rootid});

      res.send(root);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

/*
------- List Node Methods ----------
*/

//// Get By Topic ///

app.get(
  "/api/nodes/ByName/:topicname",
  async (req, res) => {
    try {
      let topicname = req.params.topicname;
      console.log(topicname);
      let topic = await Topic.find({name: topicname});
      topic = topic[0];
      console.log(topic._id);
      let node  = await ListNode.find({topic: topic._id});
      node = node[0];
      console.log(node);

      res.send(node);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
)

//// Get By Id ////

app.get(
  "/api/nodes/ById/:nodeid",
  async (req, res) => {
    try {
      let nodeid = req.params.nodeid;
      console.log(nodeid);
      let node  = await ListNode.find({_id: nodeid});
      node = node[0];
      console.log(node);

      res.send(node);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
)

/// Get N-Nodes //

async function getChildren(nodeid, list, count, max) {
  try {
    count++;
    let  node = await ListNode.find({_id: mongoose.Types.ObjectId(nodeid)});
    node = node[0];
    let topic = await    Topic.find({_id: node.topic});
    topic = topic[0];
    list.push(topic);

    if (count >= max) {
      return;
    }
    else if (node.next.length == 0) {
      return;
    }
    else {
      sublist = Array();
      for (let i=0; i<node.next.length; i++) {
        await getChildren(node.next[i], sublist, count, max)
      }
      list.push(sublist)
    }

    return list;
  }
  catch (error) {
    console.log(error);
  }
}

app.get(
  "/api/nodes/:n/:rootid",
  async (req, res) => {

    if (req.params.rootid == undefined || req.params.rootid == "undefined") {
      res.sendStatus(404);
      return;
    }

    let      n = req.params.n;
    let rootid = req.params.rootid;

    let list = Array();

    try {
      await getChildren(rootid, list, 0, n);

      res.send(list);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
)

app.post(
  "/api/nodes/",
  async (req, res) => {
    try {
      let parentid = mongoose.Types.ObjectId(req.body.parentid);
      let childid  = mongoose.Types.ObjectId(req.body.childid);

      let parentNode = await ListNode.find({_id: parentid});
      parentNode = parentNode[0];

      console.log(parentNode);
      console.log(parentNode._id);

      let childNode = await new ListNode({
        topic: childid,
        prev:  Array(parentNode._id),
        next:  Array(),
      });

      let updateStatus = await ListNode.updateOne(
        {_id: parentid},
        {
          $push: {next: childNode._id}
        }
      );

      childNode.save();

      res.send(childNode);
    }
    catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
)

app.listen(
  3002,
  () => console.log("Listening on port 3002")
)
