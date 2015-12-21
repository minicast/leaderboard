describe("simple gagarin test on the client", function() {
  var app = meteor({flavor: "fiber"})
  var client = browser({flavor: "fiber", location: app});
  var clientDDP = ddp(app, {flavor: "fiber"});

  it("should be passed on server", function() {
    var thisIs9 = 9;
    var thisIs1 = 1;

    var valueServer = app.execute(function(val1, val2) {
      return val1 + val2;
    }, [thisIs9, thisIs1]);

    expect(valueServer).to.equal(10);
  });

  it("should be passed on client", function() {
    var thisIs9 = 9;
    var thisIs1 = 1;

    var valueBrowser = client.execute(function(val1, val2) {
      return val1 + val2;
    }, [thisIs9, thisIs1]);

    expect(valueBrowser).to.equal(10);
  });

  it("should call a server method from the browser", function() {
    app.execute(function() {
      Meteor.methods({
        get10: function() {
          return 10;
        }
      });
    });

    var clientVal = client.promise(function(resolve) {
      Meteor.call('get10', function(err, value) {
        resolve(value);
      });
    });

    expect(clientVal).to.equal(10);
  });

  it("should call a server method from the browser with params", function() {
    // app.execute(function() {
    //   Meteor.methods({ get10: function() { return 10; } });
    // });

    var clientVal = client.promise(function(resolve, reject, val1, val2) {
      Meteor.call('get10', function(err, value) {
        if(err) {
          reject(err);
        } else {
          resolve(value + val1 + val2);
        }
      });
    }, [9, 1]);

    expect(clientVal).to.equal(20);
  });

  it("should call a server method using DDP", function() {
    var clientValDDP = clientDDP.call('get10');

    expect(clientValDDP).to.equal(10);
  });

  it("should publish and subscribe using DDP", function() {
    app.execute(function() {
      // create posts collection and add a post
      var Posts = new Mongo.Collection('posts');
      Posts.insert({name: "firstOne"});

      Meteor.publish('getPosts', function() {
        return Posts.find();
      });

      Meteor.methods({
        addPost: function() {
          Posts.insert({name: Random.id()});
        }
      });
    });

    // subscribe to getPosts publication and wait for the ready message
    clientDDP.subscribe('getPosts');

    var posts = clientDDP.collection("posts");

    expect(Object.keys(posts).length).to.equal(1);

    // add a new post
    clientDDP.call('addPost');

    // wait until new data comes to the clientDDP
    clientDDP.sleep(200);

    // check the new data arrived or not
    posts = clientDDP.collection("posts");
    expect(Object.keys(posts).length).to.equal(2);
  });

});

// deployment:
//   production:
//     branch: "master"
//     commands:
//       - printf "<Meteor username>\n<Meteor password>\n" | meteor deploy circlecivelocity.meteor.com
