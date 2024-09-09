const request = require("supertest");
const http = require("http");
const { getAllShows, getShowById, addNewShow } = require("../controller");
const { app, validshow } = require("../index");

jest.mock("../controller", () => ({
    ...jest.requireActual("../controller"),
    getAllShows: jest.fn(),
    getShowById: jest.fn(),
    addNewShow: jest.fn(),
}));

let server;

beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done);
});

afterAll((done) => {
    server.close(done);
});

// 1. Testing All Endpoints
describe("Testing All endpoints", () => {
    it("Should return all shows", async () => {
        const shows = [
            { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
            { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
            { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
            { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' }
        ];

        getAllShows.mockResolvedValue(shows); 

        const res = await request(server).get("/shows");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(shows);
    });

    it("Should get shows by their id", async () => {
        const show = { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' };

        getShowById.mockResolvedValue(show); 

        const res = await request(server).get("/shows/1");
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(show);
    });

    it("Should add new show", async () => {
        const newShow = {
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        };

        addNewShow.mockResolvedValue(newShow); // Mock the addNewShow function

        const res = await request(server).post("/shows").send({
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(newShow);
    });
});

// 2. Error Handling
describe("Handling Error", () => {
    it("Should return 404 when getting show by id", async () => {
        getShowById.mockResolvedValue(null);

        const res = await request(server).get("/shows/200");
        expect(res.status).toEqual(404);
    });
});

// 3. Input Validation
describe("Testing if input is valid", () => {
    it("Should validate show input", () => {
        expect(validshow({
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        })).toBeNull();
       
        expect(validshow({
            theatreId: 2,
            time: '5:00 PM'
        })).toEqual('Provide title and should be string');

        expect(validshow({
            title: 'Phantom of the Opera',
            time: '5:00 PM'
        })).toEqual('Provide theaterId and should be integer');

        expect(validshow({
            title: 'Phantom of the Opera',
            theatreId: 2,
        })).toEqual('Provide time and should be string');
    });
});

// 4. Check Function
describe("Testing Functions", () => {
    it("Should return all shows", () => {
        const shows = [
            { showId: 1, title: 'The Lion King', theatreId: 1, time: '7:00 PM' },
            { showId: 2, title: 'Hamilton', theatreId: 2, time: '8:00 PM' },
            { showId: 3, title: 'Wicked', theatreId: 3, time: '9:00 PM' },
            { showId: 4, title: 'Les Misérables', theatreId: 1, time: '6:00 PM' }
        ];

        getAllShows.mockReturnValue(shows); 

        expect(getAllShows()).toEqual(shows);
        expect(getAllShows().length).toBe(4);
    });
});

// 5. Mock async
describe("Testing Mock API", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Should add new show", async () => {
        const mockShow = {
            showId: 5,
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        };

        addNewShow.mockResolvedValue(mockShow);

        const res = await request(server).post("/shows").send({
            title: 'Phantom of the Opera',
            theatreId: 2,
            time: '5:00 PM'
        });

        expect(res.status).toEqual(200);
        expect(res.body).toEqual(mockShow);
    });
});
