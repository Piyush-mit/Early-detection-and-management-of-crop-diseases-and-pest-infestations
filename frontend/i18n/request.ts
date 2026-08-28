import { getRequestConfig } from "next-intl/server";

import { isLocale, type Locale } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale: Locale = requestedLocale && isLocale(requestedLocale)
    ? requestedLocale
    : "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
