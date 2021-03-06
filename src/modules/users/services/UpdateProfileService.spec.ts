import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "./UpdateProfileService";

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;
describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it("should be able update the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
    });

    expect(updatedUser.name).toBe("John Trê");
    expect(updatedUser.email).toBe("johntre@example.com");
  });
  it("should not be able to change to another user e-mail", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const user = await fakeUsersRepository.create({
      name: "Test",
      email: "test@example.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Trê",
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
      password: "123123",
      old_password: "123456",
    });

    expect(updatedUser.password).toBe("123123");
  });

  it("should be not able to update the password without old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Trê",
        email: "johntre@example.com",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  
  it("should be able to update the password with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
    });

    await expect(
        updateProfile.execute({
          user_id: user.id,
          name: "John Trê",
          email: "johntre@example.com",
          password: "123123",
          old_password: 'wrong-old-password'
        })
      ).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to update the profile from non-existing user", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non-existing-user-id",
        name: "John Trê",
        email: "johntre@example.com",
        password: "123123",
        old_password: 'wrong-old-password'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
