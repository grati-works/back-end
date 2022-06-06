-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_feedback_id_fkey";

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
