describe("simple gagarin test", function() {

  it("should be passed", function() {

    expect(10).to.equal(10);

  });

});

// describe('My first Gagarin test suite', function () {
//   var server = meteor();
//   var client = browser(server);
//   it('should just work', function () {
//     return server.execute(function () {
//       console.log('I am alive!');
//     });
//   });
// });

// deployment:
//   production:
//     branch: "master"
//     commands:
//       - printf "<Meteor username>\n<Meteor password>\n" | meteor deploy circlecivelocity.meteor.com
