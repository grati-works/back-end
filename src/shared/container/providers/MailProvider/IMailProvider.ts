interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: object,
    template: (_: unknown) => string,
  ): Promise<void>;
}

export { IMailProvider };
