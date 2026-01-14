import { randomUUID } from 'crypto';

import userResolvers from './user.js';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('Query.user resolver', () => {
  it('returns the user with the given id', async () => {
    const mockUser = {
      firstName: 'Mock',
      lastName: 'User',
      email: 'mockuser@test.com',
      id: '123',
      courseResults: []
    };

    const valueMock = jest.fn().mockReturnValue(mockUser);
    const getByIdMock = jest.fn().mockReturnValue({ value: valueMock });
    const getMock = jest.fn().mockReturnValue({ getById: getByIdMock });

    const context = {
      db: {
        chain: {
          get: getMock,
        },
      },
    };

    const result = await userResolvers.Query.user(
      null,
      { id: '123' },
      context,
      null
    );

    expect(result).toEqual(mockUser);

    expect(getMock).toHaveBeenCalledWith('users');
    expect(getByIdMock).toHaveBeenCalledWith('123');
    expect(valueMock).toHaveBeenCalled();
  });
});

describe('Query.users resolver', () => {
  it('returns the users', async () => {
    const mockUsers = [
      {
        firstName: 'Mock',
        lastName: 'User',
        email: 'mockuser@test.com',
        id: '123',
        courseResults: []
      },
      {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@test.com',
        id: '456',
        courseResults: []
      }
    ];

    const valueMock = jest.fn().mockReturnValue(mockUsers);
    const getMock = jest.fn().mockReturnValue({ value: valueMock });

    const context = {
      db: {
        chain: {
          get: getMock,
        },
      },
    };

    const result = await userResolvers.Query.users(
      null,
      null,
      context,
      null
    );

    expect(result).toEqual(mockUsers);

    expect(getMock).toHaveBeenCalledWith('users');
    expect(valueMock).toHaveBeenCalled();
  });
});

describe('User.firstName resolver', () => {
  it('returns firstName', async () => {
    const parent = {
      id: '123-456',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      courseResults: []
    };

    const result = await userResolvers.User.firstName(parent);
    expect(result).toBe('Test');
  });
});

describe('User.lastName resolver', () => {
  it('returns lastName', async () => {
    const parent = {
      id: '123-456',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      courseResults: []
    };

    const result = await userResolvers.User.lastName(parent);
    expect(result).toBe('User');
  });
});

describe('User.email resolver', () => {
  it('returns email', async () => {
    const parent = {
      id: '123-456',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      courseResults: []
    };

    const result = await userResolvers.User.email(parent);
    expect(result).toBe('test@example.com');
  });
});

describe('User.courseResults resolver', () => {
  it('returns course results for the user', async () => {
    const mockResults = [
      {
        id: '789',
        name: 'My Course',
        score: 99,
        learnerId: '123-456',
      }
    ]

    const parent = {
      id: '123-456',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      courseResults: mockResults
    };

    const valueMock = jest.fn().mockReturnValue(mockResults);
    const filterMock = jest.fn().mockReturnValue({ value: valueMock });
    const getMock = jest.fn().mockReturnValue({ filter: filterMock });

    const context = {
      db: {
        chain: {
          get: getMock,
        },
      },
    };

    const result = await userResolvers.User.courseResults(
      parent,
      null,
      context,
      null
    );

    expect(result).toBe(mockResults);

    expect(getMock).toHaveBeenCalledWith('courseResults');
    expect(filterMock).toHaveBeenCalledWith({ learnerId: '123-456' });
    expect(valueMock).toHaveBeenCalled();
  });
});

describe('Mutation resolvers', () => {
  describe('createUser', () => {
    it('creates and returns a new user', async () => {
      randomUUID.mockReturnValue('uuid-123');

      const users = [];
      const updateMock = jest.fn(fn => fn({ users }));

      const context = {
        db: {
          update: updateMock,
        },
      };

      const args = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      };

      const result = await userResolvers.Mutation.createUser(null, args, context);

      expect(result).toEqual({
        id: 'uuid-123',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      });

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(users).toHaveLength(1);
    });
  });

  describe('deleteUser', () => {
    it('removes the user and returns true', async () => {
      const writeMock = jest.fn().mockResolvedValue();

      const context = {
        db: {
          data: {
            users: [
              {
                firstName: 'Mock',
                lastName: 'User',
                email: 'mockuser@test.com',
                id: '123',
                courseResults: []
              },
              {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@test.com',
                id: '456',
                courseResults: []
              }
            ],
          },
          write: writeMock,
        },
      };

      const result = await userResolvers.Mutation.deleteUser(
        null,
        { id: '123' },
        context
      );

      expect(result).toBe(true);
      expect(context.db.data.users).toEqual([
        {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@test.com',
          id: '456',
          courseResults: []
        },
      ]);
      expect(writeMock).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('updates the user and returns the updated user', async () => {
      const writeMock = jest.fn().mockResolvedValue();

      const context = {
        db: {
          data: {
            users: [
              {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@test.com',
                id: '456',
                courseResults: []
              }
            ],
          },
          write: writeMock,
        },
      };

      const args = {
        id: '456',
        firstName: 'New',
        lastName: 'Name',
        email: 'new@test.com',
      };

      const result = await userResolvers.Mutation.updateUser(
        null,
        args,
        context
      );

      expect(result).toEqual({
        id: '456',
        firstName: 'New',
        lastName: 'Name',
        email: 'new@test.com',
        courseResults: []
      });

      expect(writeMock).toHaveBeenCalled();
    });
  });
});
