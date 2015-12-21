describe('My first Gagarin test suite', function () {
  var server = meteor();
  it('should just work', function () {
    return server.execute(function () {
      console.log('I am alive!');
    });
  });
});

// deployment:
//   production:
//     branch: "master"
//     commands:
//       - printf "<Meteor username>\n<Meteor password>\n" | meteor deploy circlecivelocity.meteor.com
