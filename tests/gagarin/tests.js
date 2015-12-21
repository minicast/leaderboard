describe("simple gagarin test", function() {

  var app = meteor({flavor: "fiber"});

  it("should be passed", function() {

    expect(10).to.equal(10);

  });

});

// describe("simple gagarin test", function() {
//
//   var app = meteor({flavor: "fiber"});
//   // var app = meteor({flavor: "promise"});
//
//
//   it("should be passed", function() {
//
//     var value = app.execute(function() {
//
//       return 10;
//
//     });
//
//     expect(value).to.equal(10);
//
//   });
//
// });


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
