INSERT INTO public.task (title, description, "dueDate", status, "createdAt")
SELECT
    'Task ' || generate_series,
    'Description ' || generate_series,
    NOW() + INTERVAL '1 day' * (random() * 10),
    CASE floor(random() * 4)
        WHEN 0 THEN 'TODO'
        WHEN 1 THEN 'IN PROGRESS'
        WHEN 2 THEN 'DONE'
        ELSE 'ARCHIVED'
    END,
    NOW() + INTERVAL '1 day' * (random() * 10)
FROM generate_series(1, 100);
