CREATE TABLE public.task (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	description varchar NOT NULL,
	"dueDate" timestamp NOT NULL,
	status varchar NOT NULL DEFAULT 'TODO'::character varying,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id)
);