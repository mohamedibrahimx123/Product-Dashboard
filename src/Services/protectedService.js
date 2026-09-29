import testApiClient from "./testApiClient";

export async function getProtectedData() {
  const response =
    await testApiClient.get(
      "/profile"
    );

  return response.data;
}