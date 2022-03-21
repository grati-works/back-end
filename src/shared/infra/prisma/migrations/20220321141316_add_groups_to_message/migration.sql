-- CreateTable
CREATE TABLE "_FeedbackToGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FeedbackToGroup_AB_unique" ON "_FeedbackToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_FeedbackToGroup_B_index" ON "_FeedbackToGroup"("B");

-- AddForeignKey
ALTER TABLE "_FeedbackToGroup" ADD FOREIGN KEY ("A") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeedbackToGroup" ADD FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
