import React from "react";
import { publicClient } from "./client";

export const getAddressFromEnsName = React.cache(async (name: string) => {
  try {
    const ensAddress = await publicClient.getEnsAddress({
      name: name,
    });
    return ensAddress;
  } catch (e) {
    console.error(e);
    return null;
  }
});
