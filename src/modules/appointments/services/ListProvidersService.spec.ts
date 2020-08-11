import AppError from "@shared/errors/AppError";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it("should be able list the providers", async () => {
    const loggeduser = await fakeUsersRepository.create({
      name: "Logged User",
      email: "loggeduser@example.com",
      password: "123456",
    });

    const user1 = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Trê",
      email: "johntre@example.com",
      password: "123456",
    });

    const providers = await listProviders.execute({
      user_id: loggeduser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
