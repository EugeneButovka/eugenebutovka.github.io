describe("test the test function", function() {

    it("возвращает параметр 1", function() {
        assert.equal(test(1), 1);
    });

    it("возвращает параметр 2", function() {
        assert.equal(test(2), 2);
    });

});


describe("test the test function automatic gen", function() {

    function makeTest(input){
        it("возвращает параметр"+String(input), function() {
            assert.equal(test(input), input)});
    }

    for (let i=0;i<10;++i) makeTest(i);

});