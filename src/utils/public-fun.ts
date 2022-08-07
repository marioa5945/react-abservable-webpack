import SnowflakeId from 'snowflake-id';
const snowflake = new SnowflakeId();

/**
 * Get snowflake-id
 */
export const uuid = (): string => {
  return snowflake.generate();
};
