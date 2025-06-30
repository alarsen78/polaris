-- Create the USER_ACCOUNT table
CREATE TABLE USER_ACCOUNT (
    USER_ID                     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    EMAIL                       VARCHAR(255)                    NOT NULL,
    CREATED_DATE                TIMESTAMP WITH TIME ZONE        NOT NULL,
    VERIFIED_DATE               TIMESTAMP WITH TIME ZONE,

    CONSTRAINT USER_EMAIL_UNIQUE
        UNIQUE (EMAIL)

);

-- Create the USER_PROFILE table, referencing USER_ACCOUNT
CREATE TABLE USER_PROFILE (
    PROFILE_ID                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    USER_ID                     INT,
    FIRST_NAME                  VARCHAR(255)                    NOT NULL,
    LAST_NAME                   VARCHAR(255)                    NOT NULL,
    BIRTH_DATE                  DATE,

    CONSTRAINT FK_PROFILE_USER
        FOREIGN KEY (USER_ID) 
        REFERENCES USER_ACCOUNT (USER_ID)
);

-- Create the GOAL table
CREATE TABLE GOAL (
    GOAL_ID                     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    USER_ID                     INT,    
    PRIORITY                    INT                             NOT NULL,
    NAME                        VARCHAR(255)                    NOT NULL,
    DESCRIPTION                 TEXT,
    START_DATE                  TIMESTAMP WITH TIME ZONE        NOT NULL,
    END_DATE                    TIMESTAMP WITH TIME ZONE        NOT NULL,
    DEADLINE                    TIMESTAMP WITH TIME ZONE        NOT NULL,
    COMPLETED                   BOOLEAN                         NOT NULL,
    ABANDONED                   BOOLEAN                         NOT NULL,
    PARENT_GOAL                 INT,
    
    CONSTRAINT FK_GOAL_USER
        FOREIGN KEY (USER_ID) 
        REFERENCES USER_ACCOUNT (USER_ID),

    CONSTRAINT FK_GOAL_GOAL
        FOREIGN KEY (PARENT_GOAL) 
        REFERENCES GOAL (GOAL_ID)
);

-- Create the ACTIVITY table, referencing GOAL
CREATE TABLE ACTIVITY (
    ACTIVITY_ID                 INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    GOAL_ID                     INT                             NOT NULL,    
    NAME                        VARCHAR(255)                    NOT NULL,
    DESCRIPTION                 TEXT,
    START_DATE                  TIMESTAMP WITH TIME ZONE        NOT NULL,
    END_DATE                    TIMESTAMP WITH TIME ZONE        NOT NULL,
    DEADLINE                    TIMESTAMP WITH TIME ZONE        NOT NULL,
    COMPLETED                   BOOLEAN                         NOT NULL,
    ABANDONED                   BOOLEAN                         NOT NULL,
    
    CONSTRAINT FK_ACTIVITY_GOAL
        FOREIGN KEY (GOAL_ID) 
        REFERENCES GOAL (GOAL_ID)
);

-- Create the TASK table, referencing ACTIVITY
CREATE TABLE TASK (
    TASK_ID                     INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ACTIVITY_ID                 INT                             NOT NULL,
    NAME                        VARCHAR(255)                    NOT NULL,
    DESCRIPTION                 TEXT,
    DEADLINE                    TIMESTAMP WITH TIME ZONE        NOT NULL,
    COMPLETED                   BOOLEAN                         NOT NULL,
    ABANDONED                   BOOLEAN                         NOT NULL,
    
    CONSTRAINT FK_TASK_ACTIVITY
        FOREIGN KEY (ACTIVITY_ID)
        REFERENCES ACTIVITY (ACTIVITY_ID)
);

-- Create the JOURNAL table, referencing GOAL, ACTIVITY, and TASK
CREATE TABLE JOURNAL (
    JOURNAL_ID                  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    GOAL_ID                     INT                             NOT NULL,
    ACTIVITY_ID                 INT,
    TASK_ID                     INT,    
    CONTENT                     TEXT                            NOT NULL,
    ENTRY_DATE                  TIMESTAMP WITH TIME ZONE        NOT NULL,
    
    CONSTRAINT FK_JOURNAL_GOAL
        FOREIGN KEY (GOAL_ID)
        REFERENCES GOAL (GOAL_ID),
    
    CONSTRAINT FK_JOURNAL_ACTIVITY
        FOREIGN KEY (ACTIVITY_ID)
        REFERENCES ACTIVITY (ACTIVITY_ID),
    
    CONSTRAINT FK_JOURNAL_TASK
        FOREIGN KEY (TASK_ID)
        REFERENCES TASK (TASK_ID)
);
