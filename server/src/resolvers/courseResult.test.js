import { randomUUID } from 'crypto';

import courseResultResolvers from './courseResult.js';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(),
}));

describe('Query.courseResult resolver', () => {
  it('returns the course result with the given id', async () => {
    const mockCourseResult = {
      name: 'Test Course',
      score: 100,
      learnerId: '456',
      id: '123',
    };

    const valueMock = jest.fn().mockReturnValue(mockCourseResult);
    const getByIdMock = jest.fn().mockReturnValue({ value: valueMock });
    const getMock = jest.fn().mockReturnValue({ getById: getByIdMock });

    const context = {
      db: {
        chain: {
          get: getMock,
        },
      },
    };

    const result = await courseResultResolvers.Query.courseResult(
      null,
      { id: '123' },
      context,
      null
    );

    expect(result).toEqual(mockCourseResult);

    expect(getMock).toHaveBeenCalledWith('courseResults');
    expect(getByIdMock).toHaveBeenCalledWith('123');
    expect(valueMock).toHaveBeenCalled();
  });
});

describe('Query.course results resolver', () => {
  it('returns the course results', async () => {
    const mockCourseResults = [
      {
        name: 'Test Course',
        score: 100,
        learnerId: '456',
        id: '123',
      },
      {
        name: 'Mock Course',
        score: 99,
        learnerId: '789',
        id: '321',
      }
    ];

    const valueMock = jest.fn().mockReturnValue(mockCourseResults);
    const getMock = jest.fn().mockReturnValue({ value: valueMock });

    const context = {
      db: {
        get: getMock,
      },
    };

    const result = await courseResultResolvers.Query.courseResults(
      null,
      null,
      context,
      null
    );

    expect(result).toEqual(mockCourseResults);

    expect(getMock).toHaveBeenCalledWith('courseResults');
    expect(valueMock).toHaveBeenCalled();
  });
});

describe('CourseResult.name resolver', () => {
  it('returns course name', async () => {
    const parent = {
      name: 'Test Course',
      score: 100,
      learnerId: '456',
      id: '123',
    };

    const result = await courseResultResolvers.CourseResult.name(parent);
    expect(result).toBe('Test Course');
  });
});

describe('CourseResult.score resolver', () => {
  it('returns course score', async () => {
    const parent = {
      name: 'Test Course',
      score: 100,
      learnerId: '456',
      id: '123',
    };

    const result = await courseResultResolvers.CourseResult.score(parent);
    expect(result).toBe(100);
  });
});

describe('CourseResult.learnerId resolver', () => {
  it('returns course learnerId', async () => {
    const parent = {
      name: 'Test Course',
      score: 100,
      learnerId: '456',
      id: '123',
    };

    const result = await courseResultResolvers.CourseResult.learnerId(parent);
    expect(result).toBe('456');
  });
});

describe('Mutation resolvers', () => {
  describe('createCourseResult', () => {
    it('creates and returns a new course result', async () => {
      randomUUID.mockReturnValue('uuid-123');

      const courseResults = [];
      const updateMock = jest.fn(fn => fn({ courseResults }));

      const context = {
        db: {
          update: updateMock,
        },
      };

      const args = {
        name: 'Test Course',
        score: 100,
        learnerId: '456',
      };

      const result = await courseResultResolvers.Mutation.createCourseResult(null, args, context);

      expect(result).toEqual({
        id: 'uuid-123',
        name: 'Test Course',
        score: 100,
        learnerId: '456',
      });

      expect(updateMock).toHaveBeenCalledTimes(1);
      expect(courseResults).toHaveLength(1);
    });
  });

  describe('deleteCourseResult', () => {
    it('removes the course result and returns true', async () => {
      const writeMock = jest.fn().mockResolvedValue();

      const context = {
        db: {
          data: {
            courseResults: [
              {
                name: 'Test Course',
                score: 100,
                learnerId: '456',
                id: '123',
              },
              {
                name: 'Mock Course',
                score: 99,
                learnerId: '789',
                id: '321',
              }
            ],
          },
          write: writeMock,
        },
      };

      const result = await courseResultResolvers.Mutation.deleteCourseResult(
        null,
        { id: '123' },
        context
      );

      expect(result).toBe(true);
      expect(context.db.data.courseResults).toEqual([
        {
          name: 'Mock Course',
          score: 99,
          learnerId: '789',
          id: '321',
        },
      ]);
      expect(writeMock).toHaveBeenCalled();
    });
  });

  describe('updateCourseResult', () => {
    it('updates the course result and returns the updated course result', async () => {
      const writeMock = jest.fn().mockResolvedValue();

      const context = {
        db: {
          data: {
            courseResults: [
              {
                name: 'Test Course',
                score: 100,
                learnerId: '456',
                id: '123',
              },
              {
                name: 'Mock Course',
                score: 99,
                learnerId: '789',
                id: '321',
              }
            ],
          },
          write: writeMock,
        },
      };

      const args = {
        id: '123',
        name: 'New Course',
        score: 99
      };

      const result = await courseResultResolvers.Mutation.updateCourseResult(
        null,
        args,
        context
      );

      expect(result).toEqual({
        id: '123',
        name: 'New Course',
        score: 99,
        learnerId: '456'
      });

      expect(writeMock).toHaveBeenCalled();
    });
  });
});
